import { Center, Loader } from '@mantine/core';

const Loading = () => {
  return (
    <Center my={100}>
      <Loader size="xl" type="dots" />
    </Center>
  );
};

export default Loading;
