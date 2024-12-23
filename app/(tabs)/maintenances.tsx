import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseMaintenances } from '../custom-hooks/api/maintenances/use-maintenances';
import { useTitleCase } from '../custom-hooks/misc/use-title-case';
import { router } from 'expo-router';

export default function MaintenancesScreen() {

  const { UseMaintenancesQuery } = UseMaintenances();

  const handleRedirectToCreateMaintenance = () => {
    router.push("/(screens)/register-maintenance");
  };

  return (
    <SafeAreaView className="bg-white flex-1 py-2 px-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Mantenimientos</Text>
        <TouchableOpacity 
          onPress={handleRedirectToCreateMaintenance}
          className="bg-blue-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-bold">Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList className='mt-6'
        data={ UseMaintenancesQuery.data } 
        renderItem={
          ({ item }) => (
            <View className="border-b border-gray-300 py-2 flex-row gap-4 items-center">
              <Text className={`flex-1 text-center font-bold text-sm`}>{item.estadoNombre}</Text>
              <Text className={`flex-1 text-center font-bold text-sm`}>{item.tipoNombre}</Text>
              <Text className="flex-1 text-center text-sm">{useTitleCase(item.equipoNombre)}</Text>
              <Text className="flex-1 text-center text-sm">{item.observaciones}</Text>
              <Text className="flex-1 text-center text-sm">{useTitleCase(`${item.trabajadorNombre}`)}</Text>
            </View>
          )
        }
        ListHeaderComponent={
          <View className="border-b border-gray-300 py-2 flex-row gap-4">
            <Text className="flex-1 text-center font-bold">Estado</Text>
            <Text className="flex-1 text-center font-bold">Tipo</Text>
            <Text className="flex-1 text-center font-bold">Equipo</Text>
            <Text className="flex-1 text-center font-bold">Observaciones</Text>
            <Text className="flex-1 text-center font-bold">A cargo</Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center mt-4">
            {
              UseMaintenancesQuery.isPending ? 'Cargando...' : 'No hay mantenimientos registrados'
            }
          </Text>
        }
      />
    </SafeAreaView>
  );
}