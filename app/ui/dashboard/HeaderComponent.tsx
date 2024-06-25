'use client'

import { Card, Title } from "@tremor/react"

export default function Header({title}){
    return (
        <Card className='w-full'>
          <Title>{title}</Title>
        </Card>
      );
}