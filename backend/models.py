from sqlalchemy import Column, Integer, String, Text
from database import Base


class EWasteItem(Base):
    __tablename__ = "ewaste_items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(30), default="submitted")