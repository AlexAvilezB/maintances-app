import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { UseCreateMaintenance } from "../custom-hooks/api/maintenances/use-create-maintenance";
import { CreateMaintenanceDto } from "../domain/interfaces/create-maintenance-dto.interface";
import { Picker } from "@react-native-picker/picker";
import { UseWorkers } from "../custom-hooks/api/workers/use-workers";
import { UseEquipments } from "../custom-hooks/api/equipments/use-equipments";
import { useEffect } from "react";
import { useTitleCase } from "../custom-hooks/misc/use-title-case";

export default function RegisterMaintenance() {
    const { control, handleSubmit, formState: { errors }, setFocus, getValues } = useForm();
    const { UseCreateMaintenanceQuery } = UseCreateMaintenance();
    
    const { UseWorkersQuery } = UseWorkers();
    const { UseEquipmentsQuery } = UseEquipments();

    // Función para manejar el envío del formulario
    const handleCreateMaintenance = async (data: any) => {

        console.log(data);

        try {
            const maintenance: CreateMaintenanceDto = {
                fechaInicio: data.fechaInicio,
                fechaFin: data.fechaFin,
                descripcion: data.descripcion,
                observaciones: data.observaciones,
                equipoId: data.equipoId,
                trabajadorId: data.trabajadorId,
                estadoId: data.estadoId,
                tipoId: data.tipoId,
            };

            await UseCreateMaintenanceQuery.mutateAsync(maintenance);

            // Navegar después de la creación exitosa
            router.replace('/(tabs)/maintenances');
        } catch (error) {
            console.error("Error al registrar mantenimiento", error);
            alert("Hubo un problema al registrar el mantenimiento. Inténtalo nuevamente.");
        }
    };

    return (
        <SafeAreaView className="bg-white flex-1 py-2 px-6">
            <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-bold">Registrar Mantenimiento</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="mt-4 flex-1 gap-4"
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, gap: 16 }}>

                    {/* Fecha de inicio */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Fecha de Inicio</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.fechaInicio ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="dd/mm/yyyy"
                                    keyboardType="default"
                                    onFocus={() => setFocus('fechaInicio')}  // Se asegura de enfocar el campo cuando se abre el teclado
                                />
                            </View>
                        )}
                        name="fechaInicio"
                        rules={{ 
                            required: 'La fecha de inicio es obligatoria' ,
                            pattern: {
                                value: /^\d{2}\/\d{2}\/\d{4}$/,
                                message: 'El formato de fecha debe ser dd/mm/yyyy'
                            }
                        }}
                    />

                    {/* Fecha de fin */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Fecha de Fin</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.fechaFin ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="dd/mm/yyyy"
                                    keyboardType="default"
                                    onFocus={() => setFocus('fechaFin')}
                                />
                            </View>
                        )}
                        name="fechaFin"
                        rules={{ 
                            required: 'La fecha de fin es obligatoria' ,
                            pattern: {
                                value: /^\d{2}\/\d{2}\/\d{4}$/,
                                message: 'El formato de fecha debe ser dd/mm/yyyy'
                            }
                        }}
                    />

                    {/* Descripción */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Descripción</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Descripción del mantenimiento"
                                    multiline
                                    numberOfLines={4}
                                    onFocus={() => setFocus('descripcion')}
                                />
                            </View>
                        )}
                        name="descripcion"
                        rules={{ required: 'La descripción es obligatoria' }}
                    />

                    {/* Observaciones */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Observaciones</Text>
                                <TextInput
                                    {...field}
                                    className={`border ${errors.observaciones ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                    placeholder="Observaciones"
                                    multiline
                                    numberOfLines={4}
                                    onFocus={() => setFocus('observaciones')}
                                />
                            </View>
                        )}
                        name="observaciones"
                        rules={{ required: 'Las observaciones son obligatorias' }}
                    />

                    {/* Equipo */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Equipo</Text>
                                <Picker
                                    {...field}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={`border ${errors.equipoId ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                >
                                    <Picker.Item label="Seleccionar equipo" value={null} />
                                    {UseEquipmentsQuery.data?.map((equipment: any) => (
                                        <Picker.Item key={equipment.id} label={`${equipment.nombre}`} value={equipment.id} />
                                    ))}
                                </Picker>
                            </View>
                        )}
                        name="equipoId"
                        rules={{ required: 'Seleccionar un equipo es obligatorio' }}
                    />

                    {/* Trabajador */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Trabajador</Text>
                                <Picker
                                    {...field}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={`border ${errors.trabajadorId ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                >
                                    <Picker.Item label="Seleccionar trabajador" value={null} />
                                    {UseWorkersQuery.data?.map((worker: any) => (
                                        <Picker.Item key={worker.id} label={useTitleCase(`${worker.nombre} ${worker.apellido}`)} value={worker.id} />
                                    ))}
                                </Picker>
                            </View>
                        )}
                        name="trabajadorId"
                        rules={{ required: 'Seleccionar un trabajador es obligatorio' }}
                    />

                    {/* Estado */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Estado</Text>
                                <Picker
                                    {...field}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={`border ${errors.estadoId ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                >
                                    <Picker.Item label="Seleccionar estado" value={null} />
                                    <Picker.Item label="Pendiente" value="1" />
                                    <Picker.Item label="En Proceso" value="2" />
                                    <Picker.Item label="Finalizado" value="3" />
                                </Picker>
                            </View>
                        )}
                        name="estadoId"
                        rules={{ required: 'Seleccionar un estado es obligatorio' }}
                    />

                    {/* Tipo */}
                    <Controller
                        control={control}
                        render={({ field }) => (
                            <View>
                                <Text className="text-lg font-semibold">Tipo</Text>
                                <Picker
                                    {...field}
                                    selectedValue={field.value}
                                    onValueChange={field.onChange}
                                    className={`border ${errors.tipoId ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full px-3 py-4 mt-2`}
                                >
                                    <Picker.Item label="Seleccionar tipo" value={null} />
                                    <Picker.Item label="Preventivo" value="1" />
                                    <Picker.Item label="Correctivo" value="2" />
                                </Picker>
                            </View>
                        )}
                        name="tipoId"
                        rules={{ required: 'Seleccionar un tipo es obligatorio' }}
                    />

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Botón de Enviar */}
            <TouchableOpacity
                onPress={handleSubmit(handleCreateMaintenance)}
                className={`bg-blue-500 rounded-lg w-full py-4 mt-4 ${Object.keys(errors).length > 0 ? 'opacity-50' : 'opacity-100'}`}
                disabled={Object.keys(errors).length > 0}
            >
                <Text className="text-white text-center font-bold text-lg">Registrar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
