''' Парсер для ply файлов из блендера. Очень тупой - умеет парсить только триангулированные модели, которые экспортироватли без цветов и UV (только с нормалями)'''
import sys

f = open(sys.argv[1])

vertices = []
indices = []
normals = []

def format_float(fl):
    """ Колхозное приведение к формату который ок для glsl."""
    return "%.3f"%fl

def parse_vertex_normals(line):
    splitted = line.split(' ')
    # 6 столбцов - 3 для вершины, 3 для нормали
    # если нет - не нужно
    if len(splitted) != 6:
        return

    # все столбцы должны быть float
    try:
        vertex = list(map(format_float, map(float, splitted)))
    except:
        return
    return (vertex [0:3], vertex [3:6])

def parse_index (line):
    splitted = line.split(' ')
    # 4 столбцa - 1 для обозначения количества углов в полигоне(у нас это всегда 3), и остальные 3 для собственно обозначения индексов вершин
    # если нет - не нужно
    if len(splitted) != 4:
        return

    # все столбцы должны быть интами
    try:
        index = list(map(str, map(int, splitted)))
    except:
        return
    return index[1:4]

for line in f:
    i = parse_index (line)
    if i:
        indices.append(i)
    vn = parse_vertex_normals (line)
    if vn:
        vertices.append(vn[0])
        normals.append(vn[1])

print("const positions = [")
for vertex in vertices:
    print('  ' + ', '.join(vertex) + ",")
print("]")

print("const indices = [")
for index in indices:
    print('  ' + ', '.join(index) + ",")
print("]")

print("const normals = [")
for normal in normals:
    print('  ' + ', '.join(normal) + ",")
print("]")

print("positions length", len(vertices))
print("indices length", len(indices))
print("normals length", len(normals))
