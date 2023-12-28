export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const queryParams = new URLSearchParams(request.url.substring(request.url.indexOf('?') + 1));

    // Extract individual parameters
    const from = queryParams.get('from');
    const to = queryParams.get('to');
    const departureDate = queryParams.get('departureDate');
    const returnDate = queryParams.get('returnDate');

    // Construct the apiUrl with the extracted parameters
    const apiUrl = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=${from}&destination=${to}&departure_at=${departureDate}&return_at=${returnDate}&unique=false&sorting=price&direct=false&currency=usd&limit=30&page=1&one_way=true&token=d90f8a36616fc1c341f29c73938a3270`;

    // Make the request to the external API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    // Parse and stringify the response data
    const responseData = await response.json();
    const headers = { "Content-Type": "application/json" };

    return new Response(JSON.stringify(responseData), { headers });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
