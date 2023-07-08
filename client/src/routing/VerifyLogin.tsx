import React from 'react';

export default function VerifyLogin() : boolean
{
    return getCookie("user-type") !== ""
}

function getCookie(name:String) : String {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.pop()!.split(';').shift() ?? '';
  }
  