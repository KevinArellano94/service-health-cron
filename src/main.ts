

const URL: string = Deno.env.get('URL') || 'http://localhost:8080/health';

async function pingService() {
    const request: Request = new Request(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        const response: Response = await fetch(request);
        const data: any = await response.json();
        console.log(`Health check at ${new Date().toISOString()}:`, data);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error during health check: ${error.message}`);
        } else {
            console.error('An unknown error occurred during health check');
        }
    }
}

async function main() {
	while (true) {
        await pingService();
        await new Promise(resolve => setTimeout(resolve, (1000 * 60)));
    }
}

main();