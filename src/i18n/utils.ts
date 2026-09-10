import { locales, defaultLocale } from "./config";
import type { Locale } from "./config";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./routing";

// Get locale
export function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];

  if (locales.includes(segment as Locale)) {
    return segment as Locale;
  }

  return defaultLocale;
}

// Path without locale
export function clearPath(pathname: string) {
  const parts = pathname.split("/");
  const maybeLocale = parts[1];

  if (locales.includes(maybeLocale as Locale)) {
    return "/" + parts.slice(2).join("/");
  }

  return pathname;
}

export function redirectWithLocale(req: NextRequest, path: string) {
  const { pathname } = req.nextUrl;
  const locale = getLocaleFromPath(pathname);

  const url = new URL(req.url);
  if (routing.localePrefix == "as-needed") {
    url.pathname = locale != defaultLocale ? `/${locale}${path}` : path;
  } else {
    url.pathname = `/${locale}${path}`;
  }

  return NextResponse.redirect(url);
}
