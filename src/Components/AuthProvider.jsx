"use client";

import React from 'react';
import {SessionProvider, NextAuthProvider} from 'next-auth/react';

export default function AuthProvider({ children }) {
    return (
      <SessionProvider>{children}</SessionProvider>
  
    )
  }