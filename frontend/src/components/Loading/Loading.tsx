import { Center, Loader, LoaderProps } from '@mantine/core';

const Loading = (props: LoaderProps) => {
  return (
    <Center my={100}>
      <Loader size="xl" type="dots" {...props} />
    </Center>
  );
};

export default Loading;
