from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from models import EWasteItem

app = FastAPI(title="EWaste API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "EWaste API is running!"}


@app.post("/ewaste")
def create_ewaste(item_name: str, category: str, description: str = ""):
    db = SessionLocal()

    new_item = EWasteItem(
        item_name=item_name,
        category=category,
        description=description,
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    db.close()

    return {
        "id": new_item.id,
        "item_name": new_item.item_name,
        "category": new_item.category,
        "status": new_item.status,
    }

@app.get("/ewaste")
def get_ewaste():
    db = SessionLocal()

    items = db.query(EWasteItem).all()

    db.close()

    return items    