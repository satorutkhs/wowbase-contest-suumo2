import fs from 'fs';
import path from 'path';
import { Property } from '@/types/property';
import SearchClient from './SearchClient';

function getProperties(): Property[] {
  const filePath = path.join(process.cwd(), 'data', 'properties.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Property[];
}

export default function SearchPage() {
  const properties = getProperties();
  return <SearchClient properties={properties} />;
}
