import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseFixes } from '../custom-hooks/api/fixes/use-fixes';
import { useTitleCase } from '../custom-hooks/misc/use-title-case';

export default function FixesScreen() {

  const { UseFixesQuery } = UseFixes();

  return (
    <SafeAreaView className="bg-white flex-1 py-2 px-6">
      <View className="flex-row justify-between items-center">
        <Text className="text-2xl font-bold">Reparaciones</Text>
        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-bold">Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList className='mt-6'
        data={ UseFixesQuery.data } 
        renderItem={
          ({ item }) => (
            <View className="border-b border-gray-300 py-2 flex-row gap-4 items-center">
              <Text className={`flex-1 text-center font-bold text-sm`}>{item.estadoNombre}</Text>
              <Text className={`flex-1 text-center text-sm`}>C$ {item.costoReparacion}</Text>
              <Text className="flex-1 text-center text-sm">{useTitleCase(item.equipoNombre)}</Text>
              <Text className="flex-1 text-center text-sm">{item.diagnostico}</Text>
              <Text className="flex-1 text-center text-sm">{item.solucion}</Text>
              <Text className="flex-1 text-center text-sm">{useTitleCase(`${item.trabajadorNombre}`)}</Text>
            </View>
          )
        }
        ListHeaderComponent={
          <View className="border-b border-gray-300 py-2 flex-row gap-4">
            <Text className="flex-1 text-center font-bold">Estado</Text>
            <Text className="flex-1 text-center font-bold">Costo</Text>
            <Text className="flex-1 text-center font-bold">Equipo</Text>
            <Text className="flex-1 text-center font-bold">Diagnostico</Text>
            <Text className="flex-1 text-center font-bold">Solución</Text>
            <Text className="flex-1 text-center font-bold">A cargo</Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center mt-4">
            {
              UseFixesQuery.isPending ? 'Cargando...' : 'No hay reparaciones registradas'
            }
          </Text>
        }
      />
    </SafeAreaView>
  );
}