from fastapi import FastAPI

app = FastAPI()

@app.get('/api/py/hello')
async def hello():
    return {'message': 'Hello from Python!'}
