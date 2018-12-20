# Fractal_gen
Application extending Sierpiński's triangle to more corners figures (PL)  
  
Ten program najpierw powstał w scratch'u, ale postanowiłem przenieść go do C++,  
z nakladką graficzną WxWidgets.  
  
Fraktalna figura jest geneowana metodą "gry w chaos". Oto algorytm:  
1. Wyznaczane są wieszchołki figury.
2. Losowany jest dowolny punkt
3. Losowany jest jeden z wieszchołków
4. Odległość między tym wieszchołkiem a punktem  
   jest zmniejszana o połowę. (punkt się "przyciąga')
5. ^ 3.  
  
"Fractal_gen_setup.exe" to bardzo prosty  
instalator do aplikacji graficznej.  
  
"Fractal_gen_files.zip" to wszystkie pliki projektu,  
do ich skompilowania wymagane jest środowisko z nakładką WxWidgets.  
Zostawiam je tutaj jakby ktoś był bardzo zainteresowany,  
ale przede wszystkim dla siebie na przyszłość.  
  
W programie:  SPACJA - czyszczenie ekranu  
              Ctrl+s - zapisywanie ekranu  
  
Menu po naciśnięciu 'SET'  
![](GFX/interface01.PNG)  
  
Podstawowy trójkt Sierpińskiego (3 kąty, cz. na b., 100000 punktów):
![](GFX/interface02.PNG)  
  
Kolorowy pięciokąt (5 kątów, kol. na b., 750000 punktów):
![](GFX/interface03.PNG)  
