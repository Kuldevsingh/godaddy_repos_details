import React from "react";

//below logo can put in local dir instead rendering through url.
export default function Header() {
  return (
    <header  className="absolute top-4 left-4">
      <a href="https://www.godaddy.com" target="_blank" rel="noreferrer">
        <img
          title="GoDaddy"
          src="https://www.logo.wine/a/logo/GoDaddy/GoDaddy-Logo.wine.svg"
          alt="GoDaddy Logo"
          className="w-36 h-auto"
        />
      </a>
    </header>
  );
}
