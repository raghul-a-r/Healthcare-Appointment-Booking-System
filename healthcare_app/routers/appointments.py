from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
# from datetime import datetime
from datetime import datetime, timedelta
from collections import Counter
from fastapi import Query
import models

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



@router.get("/stats")
def get_stats(date: str = Query(...), db: Session = Depends(get_db)):

    try:
        selected_date = datetime.fromisoformat(date).date()
    except:
        raise HTTPException(status_code=400, detail="Invalid date format")

    start = datetime.combine(selected_date, datetime.min.time())
    end = start + timedelta(days=1)

    appointments = db.query(models.Appointment).filter(
        models.Appointment.slot >= start,
        models.Appointment.slot < end
    ).all()

    # 1. Peak hours
    hour_counts = Counter([appt.slot.strftime("%H:%M") for appt in appointments])

    # 2. Top doctors
    doctor_counts = Counter([appt.doctor_id for appt in appointments])
    top_doctors = doctor_counts.most_common(5)

    doctor_map = {
        d.id: d.name for d in db.query(models.Doctor).all()
    }

    top_doctors_named = [
        {"name": doctor_map.get(doc_id), "count": count}
        for doc_id, count in top_doctors
    ]

    # 3. Top specialization
    spec_counts = Counter()

    for appt in appointments:
        doctor = db.query(models.Doctor).filter(models.Doctor.id == appt.doctor_id).first()
        if doctor:
            spec_counts[doctor.specialization] += 1

    top_specs = [
        {"specialization": k, "count": v}
        for k, v in spec_counts.most_common(5)
    ]

    return {
        "peak_hours": hour_counts,
        "top_doctors": top_doctors_named,
        "top_specializations": top_specs
    }