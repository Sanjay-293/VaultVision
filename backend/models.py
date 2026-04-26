from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    profile_picture = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    detections = relationship("Detection", back_populates="owner")

class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    asset_name = Column(String)
    similarity_score = Column(Float)
    risk_level = Column(String) # HIGH, MEDIUM, LOW
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    
    # VaultVision Winning Features
    evidence_report = Column(JSON, nullable=True) # Structure for report data
    ai_analysis = Column(String, nullable=True) # Full Gemini Generated Text
    status = Column(String, default="PENDING") # PENDING, ACTIONED, IGNORED

    owner = relationship("User", back_populates="detections")
