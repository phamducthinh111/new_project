import { message } from "antd";

export async function POST(request: Request) {
    const res = await request.json()
    const sessionToken = res.access_Token;
    if(!sessionToken) {
        return Response.json(
            {message: 'Not find Session token'},
            {status: 400}
    )
    }
    return Response.json({ res },
        {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly`
            }
        }
    )

}