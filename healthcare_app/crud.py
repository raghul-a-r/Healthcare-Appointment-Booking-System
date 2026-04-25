from sqlalchemy.orm import Session
from datetime import datetime, timedelta, time
from fastapi import HTTPException

import models


def create_doctor(db: Session, doctor):
    db_doctor = models.Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def get_doctors(db: Session, specialization: str = None):
    query = db.query(models.Doctor)

    if specialization:
        query = query.filter(models.Doctor.specialization == specialization)

    return query.all()


def create_appointment(db: Session, appointment):

    # Get doctor
    doctor = (
        db.query(models.Doctor)
        .filter(models.Doctor.id == appointment.doctor_id)
        .first()
    )

    if not doctor:
        return {"error": "Doctor not found"}

    slot = appointment.slot

    # 1. Not in past
    if slot < datetime.now():
        return {"error": "Cannot book past time"}

    # 2. Not more than 7 days ahead
    if slot > datetime.now() + timedelta(days=7):
        return {"error": "Cannot book beyond 7 days"}

    # 3. 30-min validation
    if slot.minute not in [0, 30]:
        return {"error": "Slots must be 30-minute intervals"}

    # 4. Working hours check
    if not (doctor.start_hour <= slot.hour < doctor.end_hour):
        return {"error": "Outside doctor working hours"}

    # 5. Double booking check (CRITICAL)
    existing = (
        db.query(models.Appointment)
        .filter(
            models.Appointment.doctor_id == appointment.doctor_id,
            models.Appointment.slot == slot,
        )
        .first()
    )

    if existing:
        return {"error": "Slot already booked"}

    # Create appointment
    db_appointment = models.Appointment(**appointment.dict())

    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)

    return db_appointment


def delete_appointment(db: Session, appointment_id: int):
    appt = (
        db.query(models.Appointment)
        .filter(models.Appointment.id == appointment_id)
        .first()
    )

    if not appt:
        return None

    db.delete(appt)
    db.commit()

    return appt


def get_slots_for_doctor(db: Session, doctor_id: int, date: datetime):

    doctor = db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()

    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    # Normalize date (strip time)
    date_only = date.date()

    start = datetime.combine(date_only, time(hour=doctor.start_hour))
    end = datetime.combine(date_only, time(hour=doctor.end_hour))

    # Get all appointments for that doctor on that day
    appointments = (
        db.query(models.Appointment)
        .filter(
            models.Appointment.doctor_id == doctor_id,
            models.Appointment.slot >= start,
            models.Appointment.slot < end,
        )
        .all()
    )

    booked_map = {appt.slot: appt.patient_name for appt in appointments}

    slots = []
    current = start

    while current < end:
        if current in booked_map:
            slots.append(
                {
                    "slot": current,
                    "is_booked": True,
                    "patient_name": booked_map[current],
                }
            )
        else:
            slots.append({"slot": current, "is_booked": False, "patient_name": None})

        current += timedelta(minutes=30)

    return slots
