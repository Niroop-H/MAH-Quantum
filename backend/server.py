from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="MAH Quantum API")
api_router = APIRouter(prefix="/api")


# ─── Models ───────────────────────────────────────────────────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactInquiry(BaseModel):
    name: str
    email: str
    company: str
    industry: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    company: str
    industry: str
    message: str
    timestamp: str


# ─── Status Routes ────────────────────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "MAH Quantum API Online", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ─── Contact Routes ───────────────────────────────────────────────────────────

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(inquiry: ContactInquiry):
    doc = inquiry.model_dump()
    doc['id'] = str(uuid.uuid4())
    doc['timestamp'] = datetime.now(timezone.utc).isoformat()
    await db.contact_inquiries.insert_one({**doc})
    return ContactResponse(**doc)

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_inquiries():
    inquiries = await db.contact_inquiries.find({}, {"_id": 0}).to_list(1000)
    return [ContactResponse(**i) for i in inquiries]


# ─── App Config ───────────────────────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
