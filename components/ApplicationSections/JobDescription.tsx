import { useEffect, useState } from 'react';
import { fetchJobDescription } from '../../utils/greenhouseApi';
import TextBox from '../TextBox/TextBox';

const JobDescription = () => {
  const [description, setDescription] = useState<string>('Loading...');

  useEffect(() => {
    fetchJobDescription().then(setDescription);
  }, []);

  return (
    <div className="mb-6 p-4 border rounded-md shadow-sm bg-gray-100">
      <TextBox type="title">Job Description</TextBox>
      <TextBox type="caption">{description}</TextBox>
    </div>
  );
};

export default JobDescription;
