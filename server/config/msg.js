module.exports.msg = (param = null, teks = null) => {
  return {
    404: "Not Found, laman yang anda tuju tidak ditemukan",
    400: `Bad Request, parameter ${param} tidak boleh kosong`,
    500: "Maintance, server sedang dalam pemeliharaan",
    401: "Unauthorization, Silahkan login untuk mendapatkan token",
    403: "Forbidden, Laman tidak boleh diakses",
    405: "Method not allowed, Aksi ini tidak diperbolehkan",
    408: "Request timeout, Server sedang sibuk",
  }
}
