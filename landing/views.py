from django.shortcuts import render


def index(request):
    context = {
        "subtitulo": "Um evento de convivência, tradição, organização e celebração comunitária.",
        "data_evento": "19 de abril de 2026",
        "tema": "Edição especial com identidade inspirada na Copa do Mundo",
        "organizacao": "Grupo de Jovens da Igreja Nossa Senhora de Nazaré",
    }
    return render(request, "landing/index.html", context)