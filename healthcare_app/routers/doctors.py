from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import schemas
import crud
from database import get_db

router = APIRouter(prefix="/doctors", tags=["Doctors"])


@router.post("/", response_model=schemas.DoctorResponse)
def add_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):

    # Basic validation
    if doctor.start_hour >= doctor.end_hour:
        raise HTTPException(status_code=400, detail="Invalid working hours")

    if not (0 <= doctor.start_hour <= 23 and 0 <= doctor.end_hour <= 23):
        raise HTTPException(status_code=400, detail="Hours must be between 0-23")

    return crud.create_doctor(db, doctor)


@router.get("/", response_model=list[schemas.DoctorResponse])
def list_doctors(specialization: str = None, db: Session = Depends(get_db)):
    return crud.get_doctors(db, specialization)