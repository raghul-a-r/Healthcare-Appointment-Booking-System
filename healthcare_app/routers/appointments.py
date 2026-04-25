from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime


import schemas
import crud
from database import get_db

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("/", response_model=schemas.AppointmentResponse)
def book_appointment(
    appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)
):

    result = crud.create_appointment(db, appointment)

    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result


@router.delete("/{appointment_id}")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db)):

    result = crud.delete_appointment(db, appointment_id)

    if not result:
        raise HTTPException(status_code=404, detail="Appointment not found")

    return {"message": "Appointment cancelled"}


@router.get("/slots/{doctor_id}", response_model=list[schemas.SlotResponse])
def get_slots(doctor_id: int, date: str, db: Session = Depends(get_db)):

    try:
        parsed_date = datetime.fromisoformat(date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    return crud.get_slots_for_doctor(db, doctor_id, parsed_date)
