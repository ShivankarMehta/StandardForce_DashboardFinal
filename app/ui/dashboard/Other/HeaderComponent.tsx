'use client'

import { Card, Title } from "@tremor/react"

export default function Header({title}){
    return (
      <Card className="w-full dark bg-gray-900 p-4 border border-gray-200 shadow-md">
      <Title>{title}</Title>
    </Card>
      );
}