<?php

namespace App\Command;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'create-sample-products',
    description: 'Generates sample products for testing',
)]
class CreateSampleProductsCommand extends Command
{

    private HttpClientInterface $httpClient;
    private EntityManagerInterface $em;

    public function __construct(HttpClientInterface $hc, EntityManagerInterface $em) {
        parent::__construct();
        $this->httpClient = $hc;
        $this->em = $em;
    }
    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $response = ($this->httpClient->request('GET', 'https://fakestoreapi.com/products'));
        
        if($response->getStatusCode() == '200'){
            foreach ($response->toArray() as $p) {
                $newProduct = new Product();
                $newProduct->setName($p["title"]);
                $newProduct->setDescription($p["description"]);
                $newProduct->setPrice($p["price"]);
                $newProduct->setImage($p["image"]);

                $this->em->persist($newProduct);
                $this->em->flush();
            }
            return Command::SUCCESS;
        }

        return Command::FAILURE;


        
    }
}
