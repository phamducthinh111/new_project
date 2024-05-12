
export async function POST(request: Request) {
    const res = await request.json()
    const accessToken = res.access_Token
    return Response.json({ res },
        {
            status: 200,
            headers: {
                'Set-Cookie': `sessionToken=${accessToken}; Path=/; HttpOnly`
            }
        }
    )

}