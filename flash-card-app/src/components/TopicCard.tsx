import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'

interface ITopicCard {
    title: string
}

const TopicCard:React.FC<ITopicCard> = ({title}) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
    </Card>
  )
}

export default TopicCard