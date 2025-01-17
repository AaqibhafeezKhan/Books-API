# Spring Boot Books API

This project is a RESTful API that integrates with the Open Library API to provide book search and filtering capabilities. It's completely free to use and requires no API key setup.

## Prerequisites

- Java 17 or higher
- Maven

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/books-api.git
cd books-api
```

2. Build the project:
```bash
./mvnw clean install
```

3. Run the application:
```bash
java -jar target/books-api-1.0.0.jar
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Search Books
```
GET /api/books/search
```

Query Parameters:
- `query` (optional): General search term
- `filterType` (optional): Type of filter (author, subject, isbn)
- `filterValue` (optional): Value to filter by
- `page` (optional, default: 0): Page number
- `size` (optional, default: 10): Results per page

Example requests:
```bash
# General search
curl "http://localhost:8080/api/books/search?query=harry+potter"

# Search by author
curl "http://localhost:8080/api/books/search?filterType=author&filterValue=tolkien"

# Search by subject/genre
curl "http://localhost:8080/api/books/search?filterType=subject&filterValue=fantasy"

# Search with pagination
curl "http://localhost:8080/api/books/search?query=programming&page=1&size=20"
```

## Response Format

```json
{
  "books": [
    {
      "key": "string",
      "title": "string",
      "authors": ["string"],
      "publishYear": "string",
      "subjects": ["string"],
      "isbn": "string",
      "coverUrl": "string",
      "description": "string"
    }
  ],
  "page": 0,
  "size": 10,
  "totalElements": 0,
  "totalPages": 0
}
```

## Deployment to Railway

1. Create a Railway account at [railway.app](https://railway.app)

2. Install Railway CLI:
```bash
npm i -g @railway/cli
```

3. Login to Railway:
```bash
railway login
```

4. Initialize Railway project:
```bash
railway init
```

5. Deploy the application:
```bash
railway up
```

Railway will automatically:
- Detect the Java project
- Use the build command: `./mvnw clean install`
- Use the start command: `java -jar target/books-api-1.0.0.jar`
- Provide a public URL for your API

## Error Handling

The API includes error handling for:
- Invalid input parameters
- External API failures
- Internal server errors

Error responses include appropriate HTTP status codes and descriptive messages.

## Development Notes

- The project uses Spring Boot 3.2.0
- Integration with Open Library API (no API key required)
- Pagination support
- Filtering by author, subject, or ISBN
- Cover images from Open Library's cover service
