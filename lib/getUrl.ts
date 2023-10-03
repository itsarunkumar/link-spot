"use client";

export const getUrl = (suburl: string) => {
  if (window.location !== undefined) {
    return `${window.location.origin}${suburl}`;
  }
  return `not found`;
};
