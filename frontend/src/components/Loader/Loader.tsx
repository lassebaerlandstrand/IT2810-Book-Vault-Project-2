import { Center, Loader } from '@mantine/core';

const LoadingCircle = () => {
  return (
    <Center my={100}>
      <Loader size="xl" type="dots" />
    </Center>
  );
};

export default LoadingCircle;
