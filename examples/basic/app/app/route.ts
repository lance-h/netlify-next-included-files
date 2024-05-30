export async function GET(request: Request) {
    return Response.json({ message: 'Test', url: request.url });
}