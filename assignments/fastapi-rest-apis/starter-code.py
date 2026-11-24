"""Starter for a local-only fictional books API."""
from fastapi import FastAPI, HTTPException

app = FastAPI()
books = [{"id": 1, "title": "Example Book"}, {"id": 2, "title": "Another Book"}]


@app.get("/books")
def list_books():
    # TODO: return the catalog
    raise NotImplementedError


@app.get("/books/{book_id}")
def get_book(book_id: int):
    # TODO: find the book or raise HTTPException(status_code=404, detail=...)
    raise NotImplementedError
