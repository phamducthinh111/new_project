
export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Đăng nhập</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
              <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium">Mật khẩu:</label>
              <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Đăng nhập</button>
          </form>
        </div>
      </div>
    )
  }
  