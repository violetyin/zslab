// 按访问者 IP 所在国家决定语言：中国内地及港澳台 → 中文，其余 → 英文
export const config = { matcher: '/' };

export default function middleware(request) {
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const zh = ['CN', 'HK', 'MO', 'TW'];
  if (!country || zh.includes(country)) {
    return; // 放行，直接给 /index.html（中文）
  }
  const url = new URL(request.url);
  url.pathname = '/en/';
  return Response.redirect(url, 307);
}
