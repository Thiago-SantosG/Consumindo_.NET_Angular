using PrimeiraApi.Models;

namespace PrimeiraApi.Rotas
{
    public static class PessoasRotas
    {
        public static List<Pessoa> Pessoas = new()
        {
            new Pessoa(Guid.NewGuid(), "Thiago"),
            new Pessoa(Guid.NewGuid(), "Neymar"),
            new Pessoa(Guid.NewGuid(), "Critiano"),
            new Pessoa(Guid.NewGuid(), "Messi"),
        };

        public static void MapPessoaRotas(this WebApplication app)
        {
            app.MapGet("/pessoas", () => Pessoas);

            app.MapGet("/pessoas/{nome}", (string nome) => Pessoas.Find( x  => x.Nome.StartsWith(nome)));

            app.MapPost("/pessoas", (HttpContext request, Pessoa pessoa) =>
            {
                pessoa.Id = Guid.NewGuid();
                Pessoas.Add(pessoa);
                return Results.Ok(pessoa);
            });

            app.MapPut("pessoas/{id:guid}", (Guid id, Pessoa pessoa) => 
            { 
                var encontrado = Pessoas.Find( x => x.Id == id);

                if (encontrado == null)
                    return Results.NotFound();

                    encontrado.Nome = pessoa.Nome;

                    return Results.Ok(encontrado);
                
            });
        }
    }
}
