from fastapi import FastAPI
from database import engine
import models
from routers import doctors, appointments

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(doctors.router)


@app.get("/")
def home():
    return {"message": "API running"}


app.include_router(doctors.router)
app.include_router(appointments.router)
