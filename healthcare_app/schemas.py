from pydantic import BaseModel
from datetime import datetime


class DoctorCreate(BaseModel):
    name: str
    specialization: str
    start_hour: int
    end_hour: int


class DoctorResponse(BaseModel):
    id: int
    name: str
    specialization: str
    start_hour: int
    end_hour: int

    class Config:
        from_attributes = True


class AppointmentCreate(BaseModel):
    doctor_id: int
    patient_name: str
    slot: datetime


class AppointmentResponse(BaseModel):
    id: int
    doctor_id: int
    patient_name: str
    slot: datetime

    class Config:
        from_attributes = True


class SlotResponse(BaseModel):
    slot: datetime
    is_booked: bool
    patient_name: str | None = None
