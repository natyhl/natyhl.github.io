import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


df = pd.read_csv('Smartphone.csv')

plt.figure(figsize=(6, 8))

sns.stripplot(y=df['Sleep_Hours'], jitter=True) # https://seaborn.pydata.org/generated/seaborn.stripplot.html

plt.ylabel('Sleep Hours')
plt.title('Sleep Hours - Strip Chart')
plt.grid(True, alpha=0.3)

plt.tight_layout()

plt.show()