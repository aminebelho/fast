// components/StatCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Adjust the import path as needed

const StatCard = ({ title, value }) => (
  <Card className="w-1/3 shadow-lg m-4">
    <CardHeader>
      <CardTitle className="font-semibold mt-2">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </CardContent>
  </Card>
);

export default StatCard;





