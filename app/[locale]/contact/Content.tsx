import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Author } from '@/types/Author';
import React from 'react';
import ContactCard from './ContactCard';

interface ContentProps {
  authors: Author[];
}

const Content: React.FC<ContentProps> = ({ authors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Authors List</CardTitle>
      </CardHeader>
      <CardContent>
        {authors?.map((author) => (
          <ContactCard author={author} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Content;
