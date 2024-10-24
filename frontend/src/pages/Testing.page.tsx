import { Button, Group, Stack, Text } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';

const Testing = () => {
  const genNewUser = () => {
    localStorage.removeItem('userID');
    window.location.reload();
  };

  return (
    <Group justify="center">
      <Stack gap="lg">
        <Text size="lg">Username: {useUser().info.name}</Text>
        <Button color="cyan" onClick={genNewUser}>
          New user
        </Button>
      </Stack>
    </Group>
  );
};

export default Testing;
