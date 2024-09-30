type RegisteredCustomerResponse = {id: string, firstName: string, lastName: string, email: string};

export class CustomerApi {
    static async registerCustomer(customerData: {
        firstName: string,
        lastName: string,
        email: string
    }): Promise<RegisteredCustomerResponse> {
        try {
            const url = 'http://localhost:8080/api/v1/customers';
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const request = new Request(url, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(customerData),
            });
            console.log(request.headers.get("Content-Type"));

            const response = await fetch(request);

            if (!response.status.toString().startsWith('2')) {
                throw new Error("Não foi possível registrar a(o) cliente " + customerData.firstName);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error("Erro na requisição de clientes.");
        }
    }
}