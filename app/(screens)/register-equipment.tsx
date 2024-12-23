import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { UseCreateEquipment } from "../custom-hooks/api/equipments/use-create-equipment";
import { CreateEquipmentDto } from "../domain/interfaces/create-equipment-dto.interface";

export default function RegisterEquipment() {
    const { control, handleSubmit, formState: { errors }, setFocus, getValues } = useForm();
    const { UseCreateEquipmentQuery } = UseCreateEquipment();

    // Función para manejar el envío del formulario
    const handleCreateEquipment = async (data: any) => {
        try {
            // Aquí estamos obteniendo los valores directamente de "data"
            const equipment: CreateEquipmentDto = {
                nombre: data.name,
                modelo: data.model,
                numeroSerie: data.email,
                estadoId: 1,
                fechaAdquisicion: new Date().toISOString()
            };

            // Esperamos a que la mutación se complete
            await UseCreateEquipmentQuery.mutateAsync(equipment);

            // Navegamos después de la creación exitosa
            router.replace('/');
        } catch (error) {
            console.error("Error al registrar equipo", error);
            alert("Hubo un problema al registrar el equipo. Inténtalo nuevamente.");
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 py-2 px-6">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold">Registrar equipo</Text>
            </View>

            <KeyboardAvoidingView 
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                className="mt-4 flex-1 gap-4">
                
                <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16 }}>
                    {/* Nombre del equipo */}
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
                        name="name"
                        rules={{ required: 'Debes ingresar el nombre' }}
                    />

                    {/* Modelo */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Modelo</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Modelo"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="model"
                        rules={{ required: 'Debes ingresar el modelo' }}
                    />

                    {/* Número de serie */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Número de serie</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Número de serie"
                                    onChangeText={field.onChange}
                                />
                            </View>
                        )}
                        name="email"
                        rules={{
                            required: 'Debes ingresar el número de serie',
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity 
                onPress={handleSubmit(handleCreateEquipment)} // Usamos handleSubmit para validar antes de llamar a la función
                className={`bg-blue-500 rounded-lg w-full py-4 mt-4 ${Object.keys(errors).length > 0 ? 'opacity-50' : 'opacity-100'}`}
                disabled={Object.keys(errors).length > 0} // Deshabilitamos el botón si hay errores
            >
                <Text className="text-white text-center font-bold text-lg">Registrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
