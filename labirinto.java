import java.util.Scanner;

public class InspecaoNove {
    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);
        
        // Cores Vibrantes (Estilo Luxúria)
        String PAREDE = "\u001B[48;5;198m"; // Rosa Choque
        String CHAO = "\u001B[48;5;53m";    // Roxo
        String PLAYER = "\u001B[48;5;226m";  // Amarelo Neon
        String RESET = "\u001B[0m";

        int px = 1, py = 1;

        int[][] mapa = {
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1},
            {1,0,0,0,1,0,0,0,0,0,0,0,0,0,1},
            {1,0,1,0,1,0,1,1,1,0,1,1,1,0,1},
            {1,0,1,0,0,0,1,0,0,0,1,0,0,0,1},
            {1,0,1,1,1,0,1,0,1,1,1,0,1,1,1},
            {1,0,0,0,0,0,0,0,0,0,0,0,0,0,1},
            {1,1,1,1,1,1,1,1,1,1,1,1,1,1,1}
        };

        while (true) {
            // "Limpa" o ecrã para o telemóvel
            System.out.print("\033[H\033[2J"); 
            System.out.flush();

            System.out.println("--- INSPEÇÃO: 9º LABIRINTO ---");

            for (int i = 0; i < mapa.length; i++) {
                for (int j = 0; j < mapa[i].length; j++) {
                    if (i == py && j == px) System.out.print(PLAYER + "  " + RESET);
                    else if (mapa[i][j] == 1) System.out.print(PAREDE + "  " + RESET);
                    else System.out.print(CHAO + "  " + RESET);
                }
                System.out.println();
            }

            System.out.println("\nJOYSTICK: [W] Cima [S] Baixo [A] Esq [D] Dir");
            System.out.print("Comando: ");
            
            // Aceita uma sequência (ex: "ddss")
            String comandos = leitor.next().toUpperCase();

            for (int k = 0; k < comandos.length(); k++) {
                char c = comandos.charAt(k);
                int nx = px, ny = py;

                if (c == 'W') ny--;
                if (c == 'S') ny++;
                if (c == 'A') nx--;
                if (c == 'D') nx++;

                if (mapa[ny][nx] == 0) {
                    px = nx;
                    py = ny;
                }
            }
        }
    }
}
