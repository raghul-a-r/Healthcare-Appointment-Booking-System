from pydantic import BaseModel, field_validator
from datetime import datetime
import re


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

    @field_validator("patient_name")
    def validate_name(cls, value):
        # Only allow alphabets and spaces
        if not re.match(r"^[A-Za-z ]+$", value):
            raise ValueError("Patient name must contain only letters and spaces")

        if len(value.strip()) < 2:
            raise ValueError("Patient name too short")

        return value.strip()


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
