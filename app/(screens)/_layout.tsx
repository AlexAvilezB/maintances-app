import { Stack } from "expo-router";

export default function FormsLayout() {

    return (
        <Stack
            screenOptions={
                {
                    headerShown: false,
                }
            }
        >
            <Stack.Screen
                name='register-worker'
            />

            <Stack.Screen
                name='register-equipment'
            />

            <Stack.Screen
                name='register-maintenance'
            />
        </Stack>
    )
}