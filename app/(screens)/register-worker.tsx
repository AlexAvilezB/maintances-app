import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UseCreateWorker } from "../custom-hooks/api/workers/use-create-worker";
import { CreateWorkerDto } from "../domain/interfaces/create-worker-dto.interface";
import { router } from "expo-router";

export default function RegisterWorker() {
    const { control, handleSubmit, formState: { errors }, setFocus, getValues } = useForm();
    const { UseCreateWorkerQuery } = UseCreateWorker();

    // Función para manejar el envío del formulario
    const handleCreateWorker = async (data: any) => {
        try {
            // Aquí estamos obteniendo los valores directamente de "data"
            const worker: CreateWorkerDto = {
                nombre: data.firstName,
                apellido: data.lastName,
                correo: data.email,
                telefono: data.phone,
                cargo: data.position,
                estadoId: 1,
                fechaContratacion: new Date().toISOString()
            };

            // Esperamos a que la mutación se complete
            await UseCreateWorkerQuery.mutateAsync(worker);

            // Navegamos después de la creación exitosa
            router.replace('/(tabs)/workers');
        } catch (error) {
            console.error("Error al crear trabajador", error);
            alert("Hubo un problema al registrar al trabajador. Inténtalo nuevamente.");
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 py-2 px-6">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold">Registrar trabajador</Text>
            </View>

            <KeyboardAvoidingView 
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                className="mt-4 flex-1 gap-4">
                
                <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16 }}>
                    {/* Nombre */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Nombre</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Nombre"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="firstName"
                        rules={{ required: 'Debes ingresar el nombre' }}
                    />

                    {/* Apellido */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Apellido</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Apellido"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="lastName"
                        rules={{ required: 'Debes ingresar el apellido' }}
                    />

                    {/* Correo */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Correo</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Correo"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="email"
                        rules={{
                            required: 'Debes ingresar el correo',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Debes ingresar un correo valido'
                            }
                        }}
                    />

                    {/* Teléfono */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Telefono</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Telefono"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="phone"
                        rules={{ required: 'Debes ingresar el telefono' }}
                    />

                    {/* Cargo */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Cargo</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Cargo"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="position"
                        rules={{ required: 'Debes ingresar el cargo' }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity 
                onPress={handleSubmit(handleCreateWorker)} // Usamos handleSubmit para validar antes de llamar a la función
                className={`bg-blue-500 rounded-lg w-full py-4 mt-4 ${Object.keys(errors).length > 0 ? 'opacity-50' : 'opacity-100'}`}
                disabled={Object.keys(errors).length > 0} // Deshabilitamos el botón si hay errores
            >
                <Text className="text-white text-center font-bold text-lg">Registrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
