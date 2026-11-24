# 📘 Assignment: Building REST APIs with FastAPI

## 🎯 Objective

Learn how HTTP GET endpoints return JSON and how status codes communicate success or missing resources.

## 📝 Tasks

### 🛠️ Create a List Endpoint

#### Description
Use the starter file to build an API for a fictional book catalog. Install FastAPI and Uvicorn in a local virtual environment and start it with `uvicorn starter-code:app --reload` (or rename the starter file to `main.py` and run `uvicorn main:app --reload`).

#### Requirements
Completed program should:

- Implement a GET endpoint at `/books` that returns the sample catalog as JSON.
- Return HTTP 200 and a list of book objects with ID and title.
- Verify the endpoint with the local interactive documentation at `/docs`.

### 🛠️ Retrieve a Book by ID

#### Description
Implement a path parameter and handle missing books.

#### Requirements
Completed program should:

- Return a matching book from `/books/{book_id}`.
- Return HTTP 404 with a clear error when the ID does not exist.
- Test a valid ID, missing ID and invalid non-integer ID (HTTP 422).
